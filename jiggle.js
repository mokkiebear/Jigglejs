// Links
// https://nolanlawson.com/2023/12/02/lets-learn-how-modern-javascript-frameworks-work-by-building-one/
// https://mikeguoynes.medium.com/part-1-build-your-own-js-framework-from-scratch-f4e35d0dffa6

const dependencyMap = new Map();
let currentEffect = null;
const effectsStack = [];

function render(element, content) {
  const app = document.querySelector(element);

  if (app) {
    app.innerHTML = content;
  }
}

function reactive(obj) {
  const keys = Object.keys(obj);
  const reactiveObj = {};

  keys.forEach(key => {
    let value = obj[key];

    Object.defineProperty(reactiveObj, key, {
      get() {
        console.log(`Getting value, ${value}`);
        track(reactiveObj, key);
        return value;
      },
      set(newValue) {
        console.log(`Setting value`, newValue);
        if (value !== newValue) { 
          value = newValue;
          trigger(reactiveObj, key);
        }
      }
    });
  });
  
  return reactiveObj;
}

function track(target, key) {
  if (!currentEffect) {
    return;
  }

  let dependencies = dependencyMap.get(target);

  if (!dependencies) {
    dependencies = new Map();
    dependencyMap.set(target, dependencies);
  }

  let dependency = dependencies.get(key);

  if (!dependency) {
    dependency = new Set();
    dependencies.set(key, dependency);
  }

    dependency.add(currentEffect);
}

function trigger(target, key) {
  const deps = dependencyMap.get(target);

  if (!deps) {
    return;
  }

  const dep = deps.get(key);

  if (dep) {
    const effectsToRun = new Set(dep);

    effectsToRun.forEach((effect) => {
      effect();
    });
  }
}

function createEffect(functionEffect) {
  const effect = function effect(...args) {
    if (effectsStack.indexOf(effect) === -1) {
      try {
        currentEffect = effect;
        effectsStack.push(effect);
        return functionEffect(...args);
      } finally {
        effectsStack.pop();
        currentEffect = effectsStack[effectsStack.length - 1];
      }
    }
  }

  effect();
}