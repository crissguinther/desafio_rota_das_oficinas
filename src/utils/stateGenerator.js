export default function stateGenerator(state, callback) {
  const newState = JSON.parse(JSON.stringify(state));
  callback(newState);
  return newState;
}
