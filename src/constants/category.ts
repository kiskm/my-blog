export const CATEGORY_DIARY = '日記' as const;
export const CATEGORY_DEVELOPMENT = '開発' as const;
export const CATEGORY_NULL = 'カテゴリーなし' as const;

export const getCategory = (name?: string) => {
    return name === 'diary' ? CATEGORY_DIARY
    : name === 'development' ? CATEGORY_DEVELOPMENT
    : CATEGORY_NULL
}