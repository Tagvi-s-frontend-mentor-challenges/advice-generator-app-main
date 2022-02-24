const h1 = document.querySelector("h1")!;
const quote = document.querySelector("blockquote p");
const button = document.querySelector("button");
type fetchedObject = {
  slip: {
    id: number;
    advice: string;
  };
};
async function fetchRandomQuote() {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    const { slip: data }: fetchedObject = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
function injectData(data: fetchedObject["slip"]) {
  h1.textContent = `Advice #${data.id}`;
  quote.textContent = `"${data.advice}"`;
}
async function fetchAndInject() {
  const data = await fetchRandomQuote();
  injectData(data);
}
fetchAndInject();
button.addEventListener("click", () => {
  button.children[0].classList.add("animate");
  setTimeout(() => {
    button.children[0].classList.remove("animate");
  }, 1000);
  fetchAndInject();
});
