import { cva, type VariantProps } from 'class-variance-authority';

export { default as Badge } from './Badge.vue';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',

        bug: 'bg-lime-600 dark:lime-500',
        dark: 'bg-black dark:border-2 dark:bg-black',
        dragon: 'bg-indigo-600 dark:indigo-500',
        electric: 'bg-yellow-600 dark:yellow-500',
        fairy: 'bg-pink-600 dark:pink-500',
        fighting: 'bg-red-600 dark:red-500',
        fire: 'bg-orange-600 dark:orange-500',
        flying: 'bg-sky-600 dark:sky-500',
        ghost: 'bg-purple-600 dark:purple-500',
        grass: 'bg-green-600 dark:border-2 dark:bg-green-600',
        ground: 'bg-amber-600 dark:amber-500',
        normal: 'bg-neutral-600 dark:neutral-500',
        poison: 'bg-violet-600 dark:violet-500',
        rock: 'bg-stone-600 dark:stone-500',
        steel: 'bg-zinc-600 dark:zinc-500',
        water: 'bg-blue-600 dark:blue-500',
        ice: 'bg-primary/70 dark:blue-500',
        psychic: 'bg-zinc-600 dark:zinc-500',

        smash:
          'bg-secondary text-background !font-bold !rounded-[0.825rem] !py-[3px] px-[14px] text-3xl',
        pass: 'bg-dislike text-background !font-bold !rounded-[0.825rem] !py-[3px] px-[14px] text-3xl',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
export type BadgeVariants = VariantProps<typeof badgeVariants>;
