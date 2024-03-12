import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

interface AlertProps {
  onclick: () => void;
  message?: string;
  placeholder?: string;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
}
function Alert({
  onclick,
  message,
  placeholder,
  className,
  variant,
}: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={className}
          variant={variant ? variant : 'destructive'}
        >
          {placeholder ?? 'Hapus'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Beneran yakin nich??</AlertDialogTitle>
          <AlertDialogDescription>
            {message ?? 'Data yang dihapus tidak bisa dikembalikan loh'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => onclick()}>
            Gas ae
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
