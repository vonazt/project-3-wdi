function filePicker(filepickerService) {
  return {
    restrict: 'A',
    require: 'ngModel',

    link($scope, $element, attrs, ngModel) {

      $element.bind('click', (e) => {
        e.preventDefault();
        filepickerService.pick({
          accept: 'image/*',
          maxFiles: 1,
          transformations: { crop: { force: true, aspectRatio: 1/1 } }
        }, data => {
          ngModel.$setViewValue(data.url);
        });
      });
    }
  };
}

export default filePicker;
