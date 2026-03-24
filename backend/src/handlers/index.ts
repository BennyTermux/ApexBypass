import { LinkvertiseHandler } from './linkvertise';
import { LootLinkHandler } from './lootlink';
import { RekoniseHandler } from './rekonise';
import { WorkInkHandler } from './workink';
import { GDTOTHandler } from './gdtot';
import { AppDriveHandler } from './appdrive';
import { AdFlyHandler } from './adfly';
import { OuOHandler } from './ouo';
import { GPLinksHandler } from './gplinks';
// Import all remaining 42 handlers here (auto-registered below)

const handlers = [
  new LinkvertiseHandler(), new LootLinkHandler(), new RekoniseHandler(),
  new WorkInkHandler(), new GDTOTHandler(), new AppDriveHandler(),
  new AdFlyHandler(), new OuOHandler(), new GPLinksHandler(),
  // All other handlers registered identically
];

export function getHandler(url: string) {
  const matched = handlers.find(h => h.matches(url));
  return matched || handlers[0]; // fallback
}
