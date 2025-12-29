import useListController from '@components/List/List.controller';

export type MenuView = {
    controller: ReturnType<typeof useListController>;
};
