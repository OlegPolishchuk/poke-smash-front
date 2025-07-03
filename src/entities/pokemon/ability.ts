export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: Generation;
  names: AbilityName[];
  effect_entries: EffectEntry[];
  effect_changes: EffectChange[];
  flavor_text_entries: FlavorTextEntry[];
  pokemon: PokemonAbility[];
}

interface Generation {
  name: string;
  url: string;
}

interface AbilityName {
  name: string;
  language: Language;
}

interface Language {
  name: string;
  url: string;
}

interface EffectEntry {
  effect: string;
  short_effect: string;
  language: Language;
}

interface EffectChange {
  version_group: VersionGroup;
  effect_entries: EffectChangeEntry[];
}

interface VersionGroup {
  name: string;
  url: string;
}

interface EffectChangeEntry {
  effect: string;
  language: Language;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version_group: VersionGroup;
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  pokemon: Pokemon;
}

interface Pokemon {
  name: string;
  url: string;
}
