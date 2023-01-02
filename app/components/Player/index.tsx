/* External dependencies */
import React, {useContext} from 'react';
import {useLocation} from 'react-router-dom';

/* Internal dependencies */
import {PlayerContext} from '~/context/playerContext/playerContextProvider';
import {ProfileContext} from '~/context/profileContext/profileContextProvider';
import Modal from '~/components/Modal';
import PlayerContent from './PlayerContent';
import LoginPrompt from './LoginPrompt';
import {useAccount} from '~/hooks/useAccount/useAccount';
import {useActiveSubscription} from '~/hooks/useSubscriptions';

const Player = () => {
  const {current} = useContext(PlayerContext);
  const location = useLocation();

  const {info} = useAccount();

  const {subscriptionStatus} = useActiveSubscription();

  const isSubscribe = subscriptionStatus === 'SUBSCRIBED';
  const isLogin = !!info.address;

  const isAuthPath = ['/registered', '/login'].includes(location.pathname);

  return (
    <Modal
      className={`component player ${
        current && !isAuthPath ? 'visible' : ''
      }`}
    >
      {info.address ? (
        <PlayerContent />
      ) : (
        <LoginPrompt
          prop={isLogin && !isSubscribe ? 'subscribe' : 'login'}
        />
      )}
    </Modal>
  );
};

export default Player;
