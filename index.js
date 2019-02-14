const contentEval = function(content, keepScripts = false) {
  // Create element from content
  const d = document.createElement("div");
  d.innerHTML = content;

  // Run script tags
  d.querySelectorAll("script").forEach(code => {
    const script = buildElement("script", code);
    document.head.appendChild(script).parentNode.removeChild(script);
  });

  // Create element with all it's attributes & content
  function buildElement(tag, src) {
    const el = document.createElement(tag);
    src.text && (el.text = src.text);
    const attrs = src.attributes;
    if (attrs.length) {
      for (var i = attrs.length - 1; i >= 0; i--) {
        el.setAttribute(attrs[i].nodeName, attrs[i].nodeValue);
      }
    }
    return el;
  }

  return keepScripts
    ? content
    : content.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
};

// Test
const test = `Lorem ipsum dolor sit,<script>alert('alert hi')</script> amet consectetur<script data-name="value" src="https://unpkg.com/axios@0.18.0/dist/axios.min.js"><\/script> adipisicing<script>console.log('console hi')</script> elit.`;
console.log(contentEval(test));
