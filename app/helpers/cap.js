import { helper } from '@ember/component/helper';

export function cap([a]) {
  return a[0].toUpperCase() + a.slice(1);
}

export default helper(cap);
