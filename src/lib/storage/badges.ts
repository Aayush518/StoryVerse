import { Badge } from '../../types';
import { Storage } from './base';

export class BadgeStorage extends Storage {
  async awardBadge(userId: string, badgeId: string): Promise<void> {
    if (this.data.userBadges.some(ub => 
      ub.userId === userId && ub.badgeId === badgeId
    )) {
      return;
    }

    this.data.userBadges.push({
      userId,
      badgeId
    });
    this.save();
  }

  async checkAndAwardBadges(userId: string): Promise<string[]> {
    const awardedBadges: string[] = [];
    const userStories = this.data.stories.filter(s => s.author_id === userId);
    const userUniverses = this.data.universes.filter(u => u.creator_id === userId);

    // Check Story Master badge
    if (userStories.filter(s => s.likes >= 100).length >= 10) {
      await this.awardBadge(userId, '1');
      awardedBadges.push('Story Master');
    }

    // Check World Builder badge
    const universesWithCollaborators = userUniverses.filter(u => {
      const collaborators = this.data.universeCollaborators.filter(c => c.universeId === u.id);
      return collaborators.length >= 5;
    });

    if (universesWithCollaborators.length > 0) {
      await this.awardBadge(userId, '2');
      awardedBadges.push('World Builder');
    }

    return awardedBadges;
  }
}