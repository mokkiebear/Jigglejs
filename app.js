let state = reactive({
  message: "Hello, Universe!"
});

function Footer() {
  return `<footer>This is footer</footer>`;
}

function renderApp() {
  render("#app", `
    <h1>${state.message}</h1>
    ${Footer()}
  `);
}

renderApp();