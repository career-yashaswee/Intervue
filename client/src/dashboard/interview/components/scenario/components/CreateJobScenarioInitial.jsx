export default function JobCard() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm gap-1 text-center pb-8 pt-8 min-h-[12rem]">
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            className="flex text-sm items-center justify-center"
            onClick={handleOpen}
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          >
            <i>Click here to add a Job Scenario</i>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingScenario ? "Edit Scenario" : "Create Scenario"}
            </DialogTitle>
          </DialogHeader>
          <form className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="Machine Learning Senior Engineer"
                type="text"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.jobTitle && (
                <span className="text-red-500">{errors.jobTitle}</span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="company">Institution</Label>
              <Input
                id="company"
                placeholder="Amazon"
                type="text"
                className="w-full"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              {errors.company && (
                <span className="text-red-500">{errors.company}</span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Paste Job Description here"
                className="min-h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.jobDescription && (
                <span className="text-red-500">{errors.jobDescription}</span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="experience">Experience</Label>
              <Input
                type="number"
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              {errors.experience && (
                <span className="text-red-500">{errors.experience}</span>
              )}
            </div>
          </form>
          <DialogFooter>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" type="reset">
                Discard
              </Button>
              <Button onClick={handleSave} size="sm" type="submit">
                Save Scenario
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
