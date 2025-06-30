# Release

Here's some unstructured release process notes for publishing this to GitHub.com:

```bash
PREVIOUS_TAG=v1.1.1
CURRENT_TAG=v1.2.2

# TODO: checkout CURRENT_TAG as branch
git reset --soft v1.1.1
git log --reverse --pretty=format:"%s%n%b%n" v1.1.1..v1.2.2 | grep -i 'co-author' > co-authors.txt
git commit -m "Release 1.2.2

$(git log --reverse --pretty=format:'%s%n%b%n' v1.1.1..v1.2.2 | grep -i 'co-author')"
# TODO: keep commit id

# TODO: checkout published branch
# TODO: cherry-pick commit from above
# TODO: push
```