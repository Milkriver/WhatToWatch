import { userProcess } from './user-process';
import { AuthorizationStatus } from '../../const';
import { ActionType } from '../../types/actions';


const DEFAULT_USER = {
  id: 1, email: '', name: '', avatarUrl: '', token: '',
};
describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(
        {
          authorizationStatus: AuthorizationStatus.Unknown,
          userData: DEFAULT_USER,
        });
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: DEFAULT_USER,
    };
    const requiredAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    };
    expect(userProcess(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: DEFAULT_USER,
      });

  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    //1 prepare
    // arrange
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: DEFAULT_USER,
    };

    const requiredAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    };

    //2 actual result
    // act
    const actualResult = userProcess(state, requiredAuthorizationAction);

    // assert
    //3.1 assert prepare -  expectedResult
    const expectedResult = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: DEFAULT_USER,
    };

    //3.2 assert execute сравнить что получилось с эталоном
    expect(actualResult).toEqual(expectedResult);
  });

  it('should logout and update authorizationStatus to "NO_AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: DEFAULT_USER,
    };
    const requireLogoutAction = {
      type: ActionType.RequireLogout,
      payload: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    };
    expect(userProcess(state, requireLogoutAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: DEFAULT_USER,
      });
  });
});