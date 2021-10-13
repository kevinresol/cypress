import { EventEmitter } from 'events'
import { DataEmitterActions } from './actions/DataEmitterActions'
import { cached } from './util/cached'

export interface DataContextShellConfig {
  rootBus: EventEmitter
}

// Used in places where we have to create a "shell" data context,
// for non-unified parts of the codebase
export class DataContextShell {
  private _appServerPort: number | undefined
  private _gqlServerPort: number | undefined

  constructor (private shellConfig: DataContextShellConfig = { rootBus: new EventEmitter }) {}

  setAppServerPort (port: number | undefined) {
    this._appServerPort = port
  }

  setGqlServerPort (port: number | undefined) {
    this._gqlServerPort = port
  }

  get appServerPort () {
    return this._appServerPort
  }

  get gqlServerPort () {
    return this._gqlServerPort
  }

  @cached
  get emitter () {
    return new DataEmitterActions(this)
  }

  get _apis () {
    return {
      busApi: this.shellConfig.rootBus,
    }
  }
}