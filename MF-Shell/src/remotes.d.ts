declare module 'mf_characters/Characters' {
    import type { ComponentType } from 'react'
    const Characters: ComponentType<{ onSelect: (id: number) => void }>
    export default Characters
}

declare module 'mf_character_detail/CharacterDetail' {
    import type { ComponentType } from 'react'
    const CharacterDetail: ComponentType<{ id: number; onBack?: () => void }>
    export default CharacterDetail
}