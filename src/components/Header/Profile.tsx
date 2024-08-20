import userHeadshot from '../../assets/images/headshot.png';

import { ProfileContainer } from './styles';

export function Profile() {
  return (
    <div>
      <ProfileContainer>
        <img src={userHeadshot} alt="User headshot" />

        <strong>Dr. Albert</strong>
      </ProfileContainer>
    </div>
  );
}
