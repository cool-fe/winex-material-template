<template>
  <container :code="code">
    <wn-demo-title></wn-demo-title>
  </container>
</template>
<script>
export default {
  data() {
    return {
      code: `<template>
    <wn-demo-title></wn-demo-title>
</template>
<script>
export default {
  data() {
    return {};
  }
};
<\/script>`
    };
  }
};
</script>
