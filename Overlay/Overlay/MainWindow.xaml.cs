using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Win32;
using Xceed.Wpf.Toolkit;


namespace Overlay
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private List<string> ow2Heroes = [
            "Ana", "Anran", "Ashe", "Baptiste", "Bastion", "Brigitte", "Cassidy", "Dmon", "Domina", "Doomfist", "Dva", "Echo", "Emre", "Freja", "Genji",
            "Hanzo", "Hazard", "Illari", "Jetpack Cat", "Junker Queen", "Juno", "Kiriko", "Lifeweaver", "Lucio", "Mauga", "Mei", "Mercy", "Mizuki", "Moira",
            "Orisa", "Pharah", "Ramattra", "Reaper", "Reinhardt", "Roadhog", "Shion", "Sierra", "Sigma", "Sojourn", "Soldier 76", "Sombra", "Symmetra",
            "Torbjorn", "Tracer", "Vendetta", "Venture", "Widowmaker", "Winston", "Wrecking Ball", "Wuyang", "Zarya", "Zenyatta"
        ];

        private int team1Score = 0;
        private int team2Score = 0;
        private int ftScore = 1;

        public MainWindow()
        {
            InitializeComponent();

            Ban1Dropdown.ItemsSource = ow2Heroes;
            Ban2Dropdown.ItemsSource = ow2Heroes;
        }

        // Updates the name h1 tags for each team
        private void TeamName_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                var textBox = (TextBox)sender;

                if (textBox == Team1NameInput)
                {
                    App._webSocket.Update("name-team1", Team1NameInput.Text);
                }
                else if (textBox == Team2NameInput)
                {
                    App._webSocket.Update("name-team2", Team2NameInput.Text);
                }
            }
        }

        // Adds 1 to the score of the team
        private void TeamScore_add(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;

            if (button == Team1ScoreAdd)
            {
                team1Score++;
                App._webSocket.Update("score-team1", team1Score.ToString());
            }
            else if (button == Team2ScoreAdd)
            {
                team2Score++;
                App._webSocket.Update("score-team2", team2Score.ToString());
            }
            else if (button == FTAdd)
            {
                ftScore++;
                App._webSocket.Update("ft-score", $"FT{ftScore}");
            }
            UpdateScoreDisplay();
        }

        // Subs 1 to the score of the team
        private void TeamScore_sub(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;

            if (button == Team1ScoreSub && team1Score > 0)
            {
                team1Score--;
                App._webSocket.Update("score-team1", team1Score.ToString());
            }
            else if (button == Team2ScoreSub && team2Score > 0)
            {
                team2Score--;
                App._webSocket.Update("score-team2", team2Score.ToString());
            }
            else if (button == FTSub && ftScore > 1)
            {
                ftScore--;
                App._webSocket.Update("ft-score", $"FT{ftScore}");
            }
            UpdateScoreDisplay();
        }

        // Sets team score to 0
        private void TeamScore_zero(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;

            if (button == Team1ScoreZero && team1Score != 0)
            {
                team1Score = 0;
                App._webSocket.Update("score-team1", "0");
            }
            else if (button == Team2ScoreZero && team2Score != 0)
            {
                team2Score = 0;
                App._webSocket.Update("score-team2", "0");
            }
            else if (button == FTZero && ftScore != 1)
            {
                ftScore = 1;
                App._webSocket.Update("ft-score", "FT1");
            }
            UpdateScoreDisplay();
        }

        private void UpdateScoreDisplay()
        {
            Team1Score.Text = team1Score.ToString();
            Team2Score.Text = team2Score.ToString();
            FTScore.Text = ftScore.ToString();
        }

        private void SelectImage(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;

            OpenFileDialog dialog = new OpenFileDialog
            {
                Title = "Select an image",
                Filter = "Image files (*.png;*.jpg;*.jpeg;*.webp)|*.png;*.jpg;*.jpeg;*.webp|All files (*.*)|*.*",
                Multiselect = false
            };

            bool? res = dialog.ShowDialog();

            if (res == true)
            {
                string filePath = dialog.FileName;

                string target;
                TextBlock textBox;

                if (button == Team1SelectImage)
                {
                    target = "img-team1";
                    textBox = Team1ImagePath;
                }
                else if (button == Team2SelectImage)
                {
                    target = "img-team2";
                    textBox = Team2ImagePath;
                }
                else
                {
                    return;
                }

                string url = $"image?path={Uri.EscapeDataString(filePath)}";
                App._webSocket.Update(target, url);
                textBox.Text = filePath;
            }
        }

        private void TeamColour(object sender, RoutedPropertyChangedEventArgs<Color?> e)
        {
            if (e.NewValue.HasValue)
            {
                Color color = e.NewValue.Value;
                string hex = $"#{color.R:X2}{color.G:X2}{color.B:X2}";

                string target;
                var picker = (ColorPicker)sender;
                if (picker == Team1Colour)
                {
                    target = "col-team1";
                }
                else if (picker == Team2Colour)
                {
                    target = "col-team2";
                }
                else
                {
                    return;
                }

                App._webSocket.Update(target, hex);
            }
        }

        private void TeamBan(object sender, SelectionChangedEventArgs e)
        {
            var dropDown = (ComboBox)sender;
            var selected = dropDown.SelectedItem as string;

            string img = selected != null ? $"./Assets/heroes/{selected}.webp" : "";

            string target;
            if (dropDown == Ban1Dropdown) target = "img-ban-team1";
            else if (dropDown == Ban2Dropdown) target = "img-ban-team2";
            else return;

            if (selected != null)
                App._webSocket.Update(target, img);
        }

        private void OverlayMargin(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            App._webSocket.Update("overlayMargin", e.NewValue.ToString());
        }
    }
}