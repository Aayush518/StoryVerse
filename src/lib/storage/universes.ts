import { Universe } from '../../types';
import { Storage } from './base';

export class UniverseStorage extends Storage {
  async getUniverses(userId?: string): Promise<Universe[]> {
    let universes = this.data.universes;
    if (userId) {
      const collaborations = this.data.universeCollaborators
        .filter(c => c.userId === userId)
        .map(c => c.universeId);
      universes = universes.filter(u => 
        u.creator_id === userId || collaborations.includes(u.id)
      );
    }

    return universes.map(universe => this.enrichUniverse(universe));
  }

  private enrichUniverse(universe: Universe) {
    return {
      ...universe,
      creator: this.data.profiles.find(p => p.id === universe.creator_id),
      stories: this.data.stories.filter(s => s.universe_id === universe.id),
      collaborators: this.data.universeCollaborators
        .filter(c => c.universeId === universe.id)
        .map(c => this.data.profiles.find(p => p.id === c.userId)!),
      rules: this.data.universeRules.filter(r => r.universe_id === universe.id),
      lore: this.data.universeLore.filter(l => l.universe_id === universe.id)
    };
  }

  async createUniverse(universe: Partial<Universe>): Promise<Universe> {
    const newUniverse: Universe = {
      id: crypto.randomUUID(),
      name: universe.name!,
      description: universe.description || '',
      creator_id: universe.creator_id!,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.data.universes.push(newUniverse);
    this.save();
    return this.enrichUniverse(newUniverse);
  }

  async updateUniverse(id: string, updates: Partial<Universe>): Promise<Universe> {
    const index = this.data.universes.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Universe not found');

    const updatedUniverse = {
      ...this.data.universes[index],
      ...updates,
      updated_at: new Date().toISOString()
    };

    this.data.universes[index] = updatedUniverse;
    this.save();
    return this.enrichUniverse(updatedUniverse);
  }

  async deleteUniverse(id: string): Promise<void> {
    this.data.universes = this.data.universes.filter(u => u.id !== id);
    this.data.stories = this.data.stories.filter(s => s.universe_id !== id);
    this.data.universeRules = this.data.universeRules.filter(r => r.universe_id !== id);
    this.data.universeLore = this.data.universeLore.filter(l => l.universe_id !== id);
    this.data.universeCollaborators = this.data.universeCollaborators.filter(c => c.universeId !== id);
    this.save();
  }

  async addCollaborator(universeId: string, userId: string, role: string = 'member'): Promise<void> {
    if (this.data.universeCollaborators.some(c => 
      c.universeId === universeId && c.userId === userId
    )) {
      throw new Error('User is already a collaborator');
    }

    this.data.universeCollaborators.push({
      universeId,
      userId,
      role
    });
    this.save();
  }

  async removeCollaborator(universeId: string, userId: string): Promise<void> {
    this.data.universeCollaborators = this.data.universeCollaborators.filter(c =>
      !(c.universeId === universeId && c.userId === userId)
    );
    this.save();
  }
}