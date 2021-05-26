<template>
  <container :code="code">
    <wn-patient-card appCode="s111ss"></wn-patient-card>
  </container>
</template>
<script>
export default {
  data() {
    return {
      code: `<template>
   <wn-patient-card></wn-patient-card>
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
