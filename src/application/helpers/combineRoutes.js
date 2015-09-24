import React from 'react';

function combineRoutes(modules = []) {
  return modules.map((module, idx)=> {
    if (module.routes) {
      return React.cloneElement(module.routes, {key: idx})
    }
    return null;
  });
}

export default combineRoutes;