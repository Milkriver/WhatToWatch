import {render} from '@testing-library/react';
import { Spinner } from './spinner';

describe('Component: Spinner', () => {
  test('should render correctly', () => {
    const {container} = render(<Spinner/>);
    expect(container).toMatchSnapshot();
  });
});
