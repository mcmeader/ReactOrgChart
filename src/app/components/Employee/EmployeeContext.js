import { createContext } from 'react';

export default createContext({
    managedEmployees: [],
    setManagedEmployees: () => {},
    hideManagedEmployees: () => {}
})