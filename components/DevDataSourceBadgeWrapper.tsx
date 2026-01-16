'use client';

import type { DataSourceStatus } from './DevDataSourceBadge';
import { DevDataSourceBadge } from './DevDataSourceBadge';

interface Props {
  sources?: DataSourceStatus;
}

export function DevDataSourceBadgeWrapper({ sources }: Props) {
  return <DevDataSourceBadge sources={sources} />;
}
