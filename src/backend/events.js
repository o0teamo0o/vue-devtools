import { stringify } from '../util'

export function initEventsBackend (vue, bridge, getInstanceName) {
  const vueEmit = vue.prototype.$emit
  vue.prototype.$emit = function () {
    vueEmit.apply(this, arguments)
    const eventName = arguments[0]
    if (!eventName.startsWith('hook:')) {
      bridge.send('event:emit', stringify({
        instanceId: this._uid,
        instanceName: getInstanceName(this),
        eventName: eventName,
        eventData: arguments[1],
        timestamp: Date.now()
      }))
    }
  }
}
