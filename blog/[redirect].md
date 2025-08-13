
<script setup>
import { useData, useRouter, withBase } from 'vitepress'
const { params } = useData()
useRouter().go(withBase(params.value.redirectUrlAbsolute))
</script>

# Redirect

Redirecting to <a :href="withBase($params.redirectUrlRelative)">{{ $params.redirectUrlAbsolute }}</a>