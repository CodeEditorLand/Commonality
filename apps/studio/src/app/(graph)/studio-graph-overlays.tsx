'use client';
import { openPackageJson } from '@/actions/editor';
import {
  EditTagsDialog,
  EditTagsDialogContent,
} from '@/components/edit-tags-dialog';
import {
  FeatureGraphPackageTooltip,
  FeatureDependencyConstraintsDialog,
} from '@commonalityco/ui-constraints';
import { Package, TagsData } from '@commonalityco/types';
import { useState } from 'react';

function StudioGraphOverlays({ tagsData }: { tagsData: TagsData[] }) {
  const [packageToEdit, setPackageToEdit] = useState<Package | null>(null);
  const tagsForPackage = tagsData
    .filter((data) => data.packageName === packageToEdit?.name)
    .flatMap((data) => data.tags);
  const uniqueTags: string[] = Array.from(
    new Set(tagsData.flatMap((pkg) => pkg.tags)),
  ).sort();

  return (
    <div className="relative z-20">
      <EditTagsDialog
        open={Boolean(packageToEdit)}
        onOpenChange={(open) => {
          if (!open) {
            setPackageToEdit(null);
          }
        }}
      >
        {packageToEdit ? (
          <EditTagsDialogContent
            pkg={packageToEdit}
            existingTags={tagsForPackage}
            tags={uniqueTags}
            onEdit={() => setPackageToEdit(null)}
          />
        ) : null}
      </EditTagsDialog>
      <FeatureDependencyConstraintsDialog />
      <FeatureGraphPackageTooltip
        onEditTags={(pkg) => setPackageToEdit(pkg)}
        onOpenPackageJson={(pkg) => openPackageJson(pkg.path)}
      />
    </div>
  );
}

export default StudioGraphOverlays;
