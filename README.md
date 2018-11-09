# redux-hooks

react hooks for redux state / dispatch. replaces react-redux.

## installation

```
yarn add redux-hooks
```

you must be using react v16.7.0-alpha

## usage

add your store to the provider

```
import { Provider } from 'redux-hooks'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
)
```

use the store hook as a replacement for `mapStateToProps` and `useAction` as a replacement for `mapDispatchToProps`

```
export default function App() {
  const teams = useStore(state => state.teams)

  useAction(dispatch => dispatch(fetchTeams()))

  return (
    <ul>
      {teams.map(t => <li>{t.name}</li>)}
    </ul>
  )
}
```

check out [nhl-hooks](https://github.com/gretzky/nhl-hooks) for a real-world example.

---

init'd with [golf](https://github.com/gretzky/golf)
