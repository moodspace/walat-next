import { helper } from '@ember/component/helper';

export function equal([a, b]) {
  return a === b;
}

export default helper(equal);
