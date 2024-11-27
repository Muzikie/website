'use client'

import React, {useCallback, FC} from 'react';

import {useModal} from '@/app/hooks/useModal';
import {IconButton} from '@/app/components/Elements';
import {ModalButtonProps} from './types';

const icons = {
  edit: 'feather',
  add: 'plus',
};

const ModalButton: FC<ModalButtonProps> = ({
  type,
  title,
  description = '',
  modalContent: Content,
  params = {},
}) => {
  const {show} = useModal();

  const showAddSongModal = useCallback(() => {
    show({
      title,
      description,
      content: <Content {...params} />,
    });
  }, [show, title, description, Content, params]);

  return (
    <IconButton
      iconName={icons[type]}
      iconSize={28}
      onPress={showAddSongModal}
      className="absolute right-8 bottom-8 w-[44px] h-[44px] rounded-3xl bg-assureStrong p-2 shadow-lg hover:shadow-xl cursor-pointer"
    />
  );
};

export default ModalButton;
