import type { BaseNotice } from '@/pages/notice/types';
import { LSService } from '@/services/ls/local-storage';

export class NoticesStore {
  private static key = 'notices';
  private readonly storage = new LSService<BaseNotice[]>(NoticesStore.key);
  notices: BaseNotice[] = [];

  constructor() {
    const notices = this.storage.get();
    if (notices) {
      this.notices = notices;
    }
  }

  sync(notices: BaseNotice[]) {
    this.storage.set(notices);
  }
}
