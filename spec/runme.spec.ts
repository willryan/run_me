import * as RunMe from '../src/RunMe';
import { expect } from 'chai';

describe('findCommand', () => {
  let config : RunMe.RunMeConfig;
  beforeEach(() => {
    config = {
      runners: [
        {
          regex: "\\.basic$",
          cmd: "uninterpolated"
        },
        {
          regex: "line",
          cmd: "echo '${line}'"
        },
        {
          regex: "feature",
          cmd: "bundle exec cucumber ${file}"
        },
        {
          regex: "spec",
          cmd: "bundle exec rspec ${fileLine(':')}"
        },
        {
          regex: "match/(.*)\.js",
          cmd: "just_the_file ${match[1]}"
        }
      ]
    };
  });

  it('returns null for empty runners list', () => {
    const config : RunMe.RunMeConfig = {
      runners: []
    };
    expect(RunMe.findCommand(config, "foo.rb", 5)).to.null;
  });

  it('returns null when no runners match', () => {
    expect(RunMe.findCommand(config, "foo.py", 15)).to.null;
  });

  it('returns a vanilla line with no interpolation', () => {
    expect(RunMe.findCommand(config, "foo.basic", 15)).to.eq('uninterpolated');
  });
  it('interpolates file', () => {
    expect(RunMe.findCommand(config, "features/foo.feature", 12)).to.eq('bundle exec cucumber features/foo.feature');
  });
  it('interpolates line', () => {
    expect(RunMe.findCommand(config, "line/foo.ln", 12)).to.eq("echo '12'");
  });
  it('interpolates fileLine', () => {
    expect(RunMe.findCommand(config, "specs/foo_spec.rb", 23)).to.eq("bundle exec rspec specs/foo_spec.rb:23");
  });
  it('interpolates match', () => {
    expect(RunMe.findCommand(config, "match/foo_file.js", 18)).to.eq("just_the_file foo_file");
  });
  it('takes the first match', () => {
    expect(RunMe.findCommand(config, "spec/line_spec.rb", 18)).to.eq("echo '18'");
  });
  it('supports no line number (including fileLine)', () => {
    expect(RunMe.findCommand(config, "specs/foo_spec.rb", null)).to.eq("bundle exec rspec specs/foo_spec.rb");
  });
});

