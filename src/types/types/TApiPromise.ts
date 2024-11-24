import TSuccessResult from './TSuccessResult';

type TApiPromise<T = TSuccessResult> = Promise<T>;

export default TApiPromise;
