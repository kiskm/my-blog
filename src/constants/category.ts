const CATEGORY_DIARY = '日記' as const;
const CATEGORY_DEVELOPMENT = '開発' as const;
const CATEGORY_NULL = 'カテゴリーなし'

export const getCategory = (name?: string) => {
    return name === 'diary' ? CATEGORY_DIARY
    : name === 'development' ? CATEGORY_DEVELOPMENT
    : CATEGORY_NULL
}