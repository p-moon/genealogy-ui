<template>
  <div style="float: left;width: 45%">
    <UserAdd></UserAdd>
  </div>

  <div style="float: right;width: 45%">
    <RelationAdd></RelationAdd>
  </div>
</template>
<script>

import UserAdd from "@/components/UserAdd";
import RelationAdd from "@/components/RelationAdd";
export default {
  name: "HeaderMenu",
  components: {RelationAdd, UserAdd},

};
</script>
