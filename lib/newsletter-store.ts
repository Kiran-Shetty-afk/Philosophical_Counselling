/* ──────────────────────────────────────────────────────────
   Newsletter subscriber store — server-side in-memory
   singleton (Phase 1: replaced by Prisma in Phase 2)
   ────────────────────────────────────────────────────────── */

export type Subscriber = {
  id: string;
  email: string;
  subscribedAt: string; // ISO 8601
  active: boolean;
};

/* ---------- singleton store -------------------------------- */

const globalStore = globalThis as unknown as {
  __newsletter_subscribers?: Subscriber[];
};

function getStore(): Subscriber[] {
  if (!globalStore.__newsletter_subscribers) {
    globalStore.__newsletter_subscribers = [];
  }
  return globalStore.__newsletter_subscribers;
}

/* ---------- helpers ---------------------------------------- */

function generateId(): string {
  return `NL-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

/* ---------- public API ------------------------------------- */

export function getAllSubscribers(): Subscriber[] {
  return [...getStore()].sort(
    (a, b) =>
      new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime(),
  );
}

export function getActiveSubscriberCount(): number {
  return getStore().filter((s) => s.active).length;
}

export function findByEmail(email: string): Subscriber | undefined {
  return getStore().find(
    (s) => s.email.toLowerCase() === email.toLowerCase(),
  );
}

export function addSubscriber(email: string): Subscriber {
  const store = getStore();
  const existing = findByEmail(email);

  if (existing) {
    // Re-activate if previously unsubscribed
    if (!existing.active) {
      existing.active = true;
      existing.subscribedAt = new Date().toISOString();
    }
    return existing;
  }

  const subscriber: Subscriber = {
    id: generateId(),
    email: email.toLowerCase().trim(),
    subscribedAt: new Date().toISOString(),
    active: true,
  };

  store.push(subscriber);
  return subscriber;
}

export function removeSubscriber(id: string): boolean {
  const store = getStore();
  const subscriber = store.find((s) => s.id === id);
  if (!subscriber) return false;
  subscriber.active = false;
  return true;
}

export function deleteSubscriber(id: string): boolean {
  const store = getStore();
  const index = store.findIndex((s) => s.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
