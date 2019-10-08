import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';
import styles from './style.less';

const Exception404 = () => (
  <Exception
    type="404"
    desc={<span className={styles.fontcolor}>{formatMessage({ id: 'app.exception.description.404' })}</span>}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception404;
