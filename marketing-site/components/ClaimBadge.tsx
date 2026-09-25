import React from 'react';
import { ClaimStatus } from '../types';
import { CheckCircle2, AlertCircle, MinusCircle, CircleDashed } from 'lucide-react';

interface Props {
  status: ClaimStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

// Labels and meanings match docs/BLUEPRINT.md in the Go repository.
const CONFIGS: Record<ClaimStatus, { label: string; description: string; cls: string; icon: typeof CheckCircle2 }> = {
  VERIFIED: {
    label: 'VERIFIED',
    description: 'Implemented and exercised by an automated test or chaos scenario with real processes, sockets and failures (single-machine scope unless stated).',
    cls: 'bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41]',
    icon: CheckCircle2,
  },
  LIMITED: {
    label: 'LIMITED',
    description: 'Works, but with a stated limitation or narrower evidence than production needs.',
    cls: 'bg-[#ffbd2e]/10 border-[#ffbd2e]/30 text-[#ffbd2e]',
    icon: AlertCircle,
  },
  NOT_IMPLEMENTED: {
    label: 'NOT IMPLEMENTED',
    description: 'Absent. Where the system can detect the gap, it reports it.',
    cls: 'bg-white/5 border-white/20 text-white/60',
    icon: MinusCircle,
  },
  NOT_RUN: {
    label: 'NOT RUN',
    description: 'The tooling exists, but the run that would establish the claim has not happened.',
    cls: 'bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]',
    icon: CircleDashed,
  },
};

export const ClaimBadge: React.FC<Props> = ({ status, size = 'sm', showLabel = true }) => {
  const config = CONFIGS[status];
  const Icon = config.icon;
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium border whitespace-nowrap ${config.cls} ${sizeClasses[size]}`}
      title={config.description}
    >
      <Icon className="w-3 h-3" />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

export const CLAIM_DESCRIPTIONS = CONFIGS;
