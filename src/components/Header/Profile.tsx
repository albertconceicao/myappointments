import userHeadshot from '../../assets/images/headshot.png';
import { useAuth } from '../../contexts/AuthContext';

import { ProfileContainer } from './styles';

export function Profile() {
  const { doctorName } = useAuth();
  console.log(doctorName);
  return (
    <div>
      <ProfileContainer>
        <img src={userHeadshot} alt="User headshot" />

        <strong>Dr. {doctorName}</strong>
      </ProfileContainer>
    </div>
  );
}
