{
  description = "Nix flake for apeiro";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... }:
    let
      pname = "apeiro";

      # System types to support.
      supportedSystems = [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ];

      # Helper function to generate an attrset '{ x86_64-linux = f "x86_64-linux"; ... }'.
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

      # Nixpkgs instantiated for supported system types.
      nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; });

      npmDir = "node_modules";

    in
    {
      # Add dependencies that are only needed for development
      devShells = forAllSystems (system:
        let 
          pkgs = nixpkgsFor.${system};
        in
        {
          default = pkgs.mkShell rec {
            buildInputs = with pkgs; [ 
              yarn
              nodejs_23
              nodePackages.typescript-language-server
              nodePackages.eslint
            ];
            lib-path = with pkgs; lib.makeLibraryPath [
            ];
   
            shellHook = ''

              if [ -d "${npmDir}" ]; then
                echo "Skipping 'npm install', '${npmDir}' already exists"
              else
                echo "Creating new 'npm install' environment in path: '${npmDir}'"
                npm install
              fi

              # export "LD_LIBRARY_PATH=$LD_LIBRARY_PATH:${lib-path}"
            '';
          };
        });

    };
}
