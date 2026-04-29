type Callback = () => void;

let _done = false;
const _subs: Callback[] = [];

export const loaderEvents = {
  isDone: () => _done,
  onDone: (cb: Callback): (() => void) => {
    if (_done) {
      cb();
      return () => {};
    }
    _subs.push(cb);
    return () => {
      const idx = _subs.indexOf(cb);
      if (idx !== -1) _subs.splice(idx, 1);
    };
  },
  complete: () => {
    _done = true;
    _subs.splice(0).forEach((fn) => fn());
  },
};
