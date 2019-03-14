import React, { createContext, useState, useEffect, useContext } from "react";
import shallowequal from "shallowequal";

const StoreContext = createContext();

const isStateObj = obj =>
  obj !== null && typeof obj === "object" && !Array.isArray(obj);

export function useStore(mapState) {
  const store = useContext(StoreContext);
  const [state, setState] = useState(mapState(store.getState().state));
  useEffect(() => {
    let stateCache = state;

    return store.subscribe(() => {
      const updatedState = mapState(store.getState());

      if (
        updatedState === stateCache ||
        (isStateObj(updatedState) &&
          isStateObj(stateCache) &&
          shallowequal(updatedState, stateCache))
      ) {
        return;
      }
      stateCache = updatedState;
      setState(updatedState);
    });
  }, []);
  return state;
}

export function useAction(mapActions) {
  const store = useContext(StoreContext);
  return mapActions(store.dispatch);
}

export const Provider = ({ children, store }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);
