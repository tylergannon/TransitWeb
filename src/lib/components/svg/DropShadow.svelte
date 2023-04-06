<script>
  export let id = "drop-shadow";
  export let dx = 2;
  export let dy = 2;
  export let stdDeviation = 3;
  export let floodColor = "rgba(0,0,0,0.5)";
</script>

<filter filterUnits="userSpaceOnUse" id={id} x="-50%" y="-50%" width="300%" height="300%">
  <feGaussianBlur in="SourceAlpha" stdDeviation={stdDeviation} />
  <feOffset dx={dx} dy={dy} result="offsetblur" />
  <feFlood flood-color={floodColor} />
  <feComposite in2="offsetblur" operator="in" />
  <feMerge>
    <feMergeNode />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>
