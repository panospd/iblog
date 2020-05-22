export default function(context) {
  if (process.client) {
    console.log("Rock you like a hurricane!!!");
    context.store.dispatch("initAuth");
  }
}
