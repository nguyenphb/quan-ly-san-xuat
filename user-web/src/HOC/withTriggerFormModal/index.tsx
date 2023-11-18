import { FC, useCallback, useMemo, useState } from 'react';

export interface TriggerFormModalProps<T = any> {
  trigger?: JSX.Element;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  modalProps?: T;
}

const withTriggerFormModal = ({
  defaultTrigger: DefaultTrigger,
  contentRender,
}: {
  defaultTrigger: ({ changeOpen }: { changeOpen: (open: boolean) => void }) => React.ReactNode;
  contentRender: FC<TriggerFormModalProps>;
}) => {
  const Component: FC<TriggerFormModalProps> = ({
    open,
    trigger,
    onOpenChange,
    onSuccess,
    modalProps,
  }) => {
    const [_open, _setOpen] = useState(false);
    const openActive = typeof open === 'boolean' ? open : _open;
    const onOpenChangeActive = typeof onOpenChange === 'function' ? onOpenChange : _setOpen;
    const ContentRender = useMemo(() => contentRender, [contentRender]);
    if (!ContentRender) return null;
    return (
      <>
        {trigger || (DefaultTrigger ? <DefaultTrigger changeOpen={_setOpen} /> : null)}
        {openActive && (
          <>
            <ContentRender
              open={openActive}
              trigger={trigger}
              onOpenChange={onOpenChangeActive}
              onSuccess={onSuccess}
              modalProps={modalProps}
            />
          </>
        )}
      </>
    );
  };
  return Component;
};

export default withTriggerFormModal;
