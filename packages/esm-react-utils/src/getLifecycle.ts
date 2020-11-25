import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import {
  openmrsRootDecorator,
  RootDecoratorOptions,
} from "./openmrsRootDecorator";

export function getRootedLifecycle<T>(
  Root: React.ComponentType<T>,
  options: RootDecoratorOptions
) {
  return singleSpaReact({
    React,
    ReactDOM,
    rootComponent: openmrsRootDecorator(options)(Root),
  });
}

export function getAsyncLifecycle<T>(
  lazyRoot: () => Promise<{ default: React.ComponentType<T> }>,
  options: RootDecoratorOptions
) {
  return () =>
    lazyRoot().then(({ default: Root }) => getRootedLifecycle(Root, options));
}