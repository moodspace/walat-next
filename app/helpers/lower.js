import { helper } from '@ember/component/helper';

export function lower([a]) {
  return a.toLowerCase();
}

export default helper(lower);
