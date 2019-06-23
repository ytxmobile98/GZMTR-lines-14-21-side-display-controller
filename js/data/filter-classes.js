"use strict";

import { TypeChecker } from "../type-checker.js";
import { ServiceType } from "./service-type-classes.js";
import { Station } from "./station-classes.js";

class RawFilter {
  constructor(name, destinations, serviceType = undefined) {
    TypeChecker.checkTypeOf(name, "string");
    TypeChecker.checkArrayType(destinations, "string");
    if (serviceType !== undefined) {
      TypeChecker.checkTypeOf(serviceType, "string");
    }

    this.name = name;
    this.destinations = destinations;
    this.serviceType = serviceType;
  }
}

class Filter {
  constructor(line, name, destinations, serviceType, crossLineServiceType) {
    TypeChecker.checkTypeOf(line, "string");
    TypeChecker.checkTypeOf(name, "string");
    TypeChecker.checkArrayType(destinations, Station);
    TypeChecker.checkInstanceOf(serviceType, ServiceType);
    TypeChecker.checkInstanceOf(crossLineServiceType, ServiceType);

    this.line = line;
    this.name = name;
    this.destinations = destinations;
    this.serviceType = serviceType;
    this.crossLineServiceType = crossLineServiceType;
  }
}

export { RawFilter, Filter };
