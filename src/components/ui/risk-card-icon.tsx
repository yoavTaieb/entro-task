import React from 'react';
import { Icon } from '@chakra-ui/react';

interface Props {
  icon: React.ReactElement;
}

const RiskCardIcon: React.FC<Props> = ({ icon }) => {
  return (
    <div className="flex justify-center items-center w-16 h-16 rounded-lg bg-primary shadow-lg border border-[#99B4DD]">
      <div className="text-white text-4xl">{icon}</div>
    </div>
  );
};

export default RiskCardIcon;