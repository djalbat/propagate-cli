"use strict";

export default function checkDevDependenciesOperation(proceed, abort, context) {
  const { diffs } = context,
        names = [],
        devDependencyMissing = diffs.some((diff) => {
          const name = diff.getName();

          if (name !== null) {
            names.push(name)
          }

          const devDependencyMissing = diff.someDevDependencySemverDiff((devDependencySemverDiff) => {
            const devDependencySemverDiffName = devDependencySemverDiff.getName(),
                  devDependencyName = devDependencySemverDiffName,  ///
                  namesIncludesDevDependencyName = names.includes(devDependencyName),
                  devDependencyMissing = !namesIncludesDevDependencyName;

            if (devDependencyMissing) {
              const subDirectoryPath = diff.getSubDirectoryPath();

              console.log(`The '${subDirectoryPath}' release expects the '${devDependencyName}' developer dependency to have already been published.`);

              console.log(`This is not the case, however, and therefore the propagation will almost certainly fail.`);

              console.log(`To fix this, try adding a forced dependency relation between the two.`)

              return true;
            }
          });

          if (devDependencyMissing) {
            return true;
          }
        });

  devDependencyMissing ?
    abort() :
      proceed();
}
